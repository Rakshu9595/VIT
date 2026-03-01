/**
 * @file
 * Exit Intent Form JavaScript for anonymous users
 */

(function ($, Drupal, drupalSettings) {
  'use strict';

  // Fallback for jQuery once if not available
  if (!$.fn.once) {
    $.fn.once = function(id) {
      // Simple implementation - just adds a data attribute to prevent re-running
      return this.each(function() {
        var $this = $(this);
        var dataKey = 'jquery-once-' + id;
        if ($this.data(dataKey)) {
          return;
        }
        $this.data(dataKey, true);
      });
    };
  }

  Drupal.behaviors.exitIntentForm = {
    attach: function (context, settings) {
      // Ensure AJAX is properly initialized for anonymous users
      if (typeof Drupal.ajax === 'undefined') {
        return;
      }

      // Handle Send OTP button - removed the custom click handler since AJAX handles it
      // The AJAX functionality is already attached by Drupal's Form API
      
      // Handle form submission validation
      $('form[data-drupal-selector="exit-intent-form"]', context).once('exit-intent-submit').each(function() {
        var $form = $(this);
        
        // Add client-side validation on form submit
        $form.on('submit', function(e) {
          var $submitButton = $(e.originalEvent.submitter || e.target.querySelector('input[type="submit"], button[type="submit"]'));
          
          // Only validate for main submit, not for Send OTP or alternative link
          if ($submitButton.attr('name') === 'op' && $submitButton.val() === 'Submit') {
            var mode = $form.find('#edit-mode').val();
            var name = $('#full-name-input').val().trim();
            var mobile = $('#mobile-number-input').val().trim();
            var otp = $('#otp-input').val().trim();
            
            var errors = [];
            
            if (!name) {
              errors.push('Please provide full name.');
              $('#full-name-input').addClass('error');
            } else {
              $('#full-name-input').removeClass('error');
            }
            
            if (!mobile || !/^\d{10}$/.test(mobile)) {
              errors.push('Please enter a valid 10-digit mobile number.');
              $('#mobile-number-input').addClass('error');
            } else {
              $('#mobile-number-input').removeClass('error');
            }
            
            // Only check OTP if in normal mode
            if (mode !== 'alternative' && !otp) {
              errors.push('Please enter the OTP.');
              $('#otp-input').addClass('error');
            } else {
              $('#otp-input').removeClass('error');
            }
            
            if (errors.length > 0) {
              $('#form-message-container').html('<div class="alert alert-danger">' + errors.join('<br>') + '</div>');
              $form.find('#form-message-container').html('<div class="alert alert-danger">' + errors.join('<br>') + '</div>');
              e.preventDefault();
              return false;
            }
          }
        });
      });

      // Auto-focus on OTP field when it becomes enabled
      $('#otp-input', context).once('exit-intent-otp-focus').each(function() {
        var $otpInput = $(this);
        
        // Watch for readonly attribute changes
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'readonly') {
              if (!$otpInput.attr('readonly')) {
                $otpInput.focus().select();
              }
            }
          });
        });
        
        observer.observe(this, {
          attributes: true,
          attributeFilter: ['readonly']
        });
        
        // Also handle direct focus events
        $otpInput.on('focus', function() {
          if (!$(this).attr('readonly')) {
            $(this).select();
          }
        });
      });

      // Handle Send OTP button state changes
      $('#sendotp-button', context).once('exit-intent-otp-button').each(function() {
        var $button = $(this);
        
        // Monitor for AJAX completion
        $(document).on('ajaxComplete', function(event, xhr, settings) {
          // Check if this was the OTP send request
          if (settings.extraData && settings.extraData._triggering_element_name === 'sendotp') {
            // Button state will be managed by the AJAX response commands
            // This is just for monitoring/debugging if needed
          }
        });
      });

      // Handle alternative link visibility
      $('#alternative-link', context).once('exit-intent-alt-link').each(function() {
        var $link = $(this);
        
        // Monitor for AJAX errors that should show the alternative link
        $(document).on('ajaxError', function(event, xhr, settings) {
          if (settings.extraData && settings.extraData._triggering_element_name === 'sendotp') {
            // Show alternative link on OTP send error
            $link.show();
          }
        });
      });

      // Clear messages when input fields are corrected
      $('#full-name-input, #mobile-number-input, #otp-input', context).once('exit-intent-clear-errors').each(function() {
        $(this).on('input', function() {
          var $input = $(this);
          var value = $input.val().trim();
          
          if ($input.attr('id') === 'full-name-input' && value) {
            $input.removeClass('error');
          } else if ($input.attr('id') === 'mobile-number-input' && /^\d{10}$/.test(value)) {
            $input.removeClass('error');
          } else if ($input.attr('id') === 'otp-input' && value) {
            $input.removeClass('error');
          }
          
          // Clear error messages if all fields are valid
          var hasErrors = $('.error', $input.closest('form')).length > 0;
          if (!hasErrors) {
            $('#form-message-container').empty();
            $input.closest('form').find('#form-message-container').empty();
          }
        });
      });
    }
  };

  // Custom AJAX command handlers (if needed)
  if (Drupal.AjaxCommands) {
    // Custom AJAX command to handle OTP success
    Drupal.AjaxCommands.prototype.otpSentSuccess = function (ajax, response, status) {
      $('#form-message-container').html('<div class="alert alert-success">' + response.message + '</div>');
      $('#sendotp-button').prop('disabled', true).text('OTP Sent');
      $('#otp-input').removeAttr('readonly').focus();
    };

    // Custom AJAX command to handle OTP error
    Drupal.AjaxCommands.prototype.otpSentError = function (ajax, response, status) {
      $('#form-message-container').html('<div class="alert alert-danger">' + response.message + '</div>');
      $('#alternative-link').show();
      $('#sendotp-button').prop('disabled', false).text('Send OTP');
    };
  }

})(jQuery, Drupal, drupalSettings);
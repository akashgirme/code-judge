export const verifyEmailWithOtpMjml = `
      <mj-section padding='0'>
        <mj-column>
          <mj-text>
            <p class='lead helvetica'>
              Let's get you signed in
            </p>
            <p class= 'helvetica'>
              All you have to do is click this button and we'll sign you in with a secure link
            </p>
          </mj-text>
          <mj-button href="{{validationUrl}}" background-color="#7351BE" border-radius="10000px" align='left' font-size='13px' font-weight='700'>
            <img src="https://res.cloudinary.com/du9w6anxr/image/upload/v1710934256/email-pics/reload-icon.png" alt="Instagram" width="20" height="20" style="margin-right: 4px; vertical-align: middle;" /> <span style="vertical-align:middle;">Sign In</span>
          </mj-button>
          <mj-text>
            <p class='faded'>
              This link works for only 10 mins. If clicking on the button didn’t work then click on this link to verify <a href="{{validationUrl}}" class="text-link">
                {{validationUrl}}
              </a> <br /><br />
            </p>
            <p class='faded helvetica'>
              Login from different browser, Here is OTP <p class='lead helvetica'>{{otp}}</p>.<br />
              If you didn’t attempt to sign in, you can safely ignore this email.
            </p>
          </mj-text>
        </mj-column>
      </mj-section>
`;

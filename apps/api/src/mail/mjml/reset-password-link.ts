export const resetPasswordLinkMjml = `
      <mj-section padding='0'>
        <mj-column>
          <mj-text>
            <p class='lead'>
              Hello {{firstName}} 👋 <br /> <br />
              Looks like you want to reset your account password. Don’t worry, we got you covered!
            </p>
          </mj-text>
          <mj-button href="{{resetPasswordLink}}" background-color="#7351BE" border-radius="10000px" align='left' font-size='13px' font-weight='700'>
            <span style="vertical-align:middle;">Reset Password</span>
          </mj-button>
          <mj-text>
            <p class='faded'>
              This link works for only 10 mins. If clicking on the button didn’t work then click on this link to verify <a href="{{resetPasswordLink}}" class="text-link">
                {{resetPasswordLink}}
              </a> <br /><br />

              If you didn’t attempt to sign in, you can ignore this email.
            </p>
          </mj-text>
        </mj-column>
      </mj-section>
`;

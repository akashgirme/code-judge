export const verifyEmailWithOtpMjml = `
      <mj-section padding='0'>
        <mj-column>
          <mj-text>
            <p class='lead helvetica'>
              Hello {{firstName}} 👋
            </p>
            <p class="helvetica" style="font-size: 32px; font-weight: 700">
              {{otp}}
            </p>
            <p class='lead helvetica'>
              is your code-judge sign in code.
            </p>
            <p class='faded helvetica'>
              The verification code works for only 10 mins.<br />
              If you didn’t attempt to sign in, you can ignore this email.
            </p>
          </mj-text>
        </mj-column>
      </mj-section>
`;

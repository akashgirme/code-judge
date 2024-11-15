import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/auth/request-sign-in-otp',
    '/auth/reset-password',
    '/auth/sign-in-with-otp',
    '/auth/sign-in-with-password',
    '/auth/sign-in-with-token',
    '/auth/verify-email',
  ],
};

export default function middleware(request: NextRequest) {
  console.log('AUth middleware running...');
  const refreshToken = request.cookies.get('refreshToken');
  if (refreshToken) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  return NextResponse.next();
}

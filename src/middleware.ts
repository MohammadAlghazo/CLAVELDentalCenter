import { withAuth } from "next-auth/middleware";

// This middleware protects all routes under /admin
// If a user is not logged in, they will be redirected to the login page automatically.
export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // Apply middleware to all routes starting with /admin
  matcher: ["/admin/:path*"],
};

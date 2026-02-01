import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SimpleHeader from '../../components/layout/SimpleHeader';
import Footer from '../../components/layout/Footer';

const SignInPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
      const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
      const successUrl = `${window.location.origin}/my-ideas`;
      const failureUrl = `${window.location.origin}/sign-in?error=oauth-failed`;

      window.location.href = `${appwriteEndpoint}/account/sessions/oauth2/google?project=${projectId}&success=${successUrl}&failure=${failureUrl}`;
    } catch (err: any) {
      setError('Failed to initialize Google sign-in');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
      const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
      const successUrl = `${window.location.origin}/my-ideas`;
      const failureUrl = `${window.location.origin}/sign-in?error=oauth-failed`;

      window.location.href = `${appwriteEndpoint}/account/sessions/oauth2/github?project=${projectId}&success=${successUrl}&failure=${failureUrl}`;
    } catch (err: any) {
      setError('Failed to initialize GitHub sign-in');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SimpleHeader />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Welcome Back
              </motion.h1>
              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Sign in to continue to IdeaHub
              </motion.p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200"
              >
                <AlertCircle size={18} />
                <span className="text-sm">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </motion.div>
            )}

            {/* OAuth Buttons */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full h-12 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600 text-white"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleGithubSignIn}
                className="w-full h-12 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600 text-white"
              >
                <Github className="mr-2 h-5 w-5" />
                Continue with GitHub
              </Button>
            </motion.div>

            {/* Footer Links */}
            <motion.div
              className="mt-8 text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link to="/sign-up" className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign up
                </Link>
              </p>
              <Link to="/" className="text-gray-400 hover:text-white text-sm inline-block">
                ← Back to Home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SignInPage;

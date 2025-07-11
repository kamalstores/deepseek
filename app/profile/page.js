'use client';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex h-screen bg-[#292a2d] text-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not signed in
  if (!isSignedIn) {
    return null; // Will redirect via useEffect
  }

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-[#292a2d] text-white">
      {/* Header with back button */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Image 
                src={assets.arrow_icon} 
                alt="Back" 
                className="w-5 h-5 rotate-180"
              />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-semibold">Profile</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Profile Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-[#212327] rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              {/* Profile Image */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gray-600">
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src={assets.profile_icon}
                      alt="Profile"
                      className="w-12 h-12 opacity-60"
                    />
                  </div>
                )}
              </div>

              {/* User Information */}
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">Name</p>
                  <p className="text-white text-lg font-medium">
                    {user.fullName || 'No name provided'}
                  </p>
                </div>

                <div>
                  <p className="text-white/60 text-sm mb-1">Email</p>
                  <p className="text-white text-lg">
                    {user.primaryEmailAddress?.emailAddress || 'No email provided'}
                  </p>
                </div>

                <div>
                  <p className="text-white/60 text-sm mb-1">Member since</p>
                  <p className="text-white text-lg">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Profile Management */}
              <div className="mt-8 pt-6 border-t border-gray-600">
                <p className="text-white/60 text-sm mb-4">Account Management</p>
                <div className="space-y-2">
                  <button className="w-full bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg transition-colors">
                    Edit Profile
                  </button>
                  <button className="w-full bg-gray-600/20 hover:bg-gray-600/30 text-white/80 px-4 py-2 rounded-lg transition-colors">
                    Privacy Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">Last Updated: 16-02-2024</p>

      <p>Welcome to OdinBook! OdinBook is a social media platform designed for educational purposes. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information. By using OdinBook, you agree to the terms of this Privacy Policy.</p>

      {/* Information We Collect */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>

        {/* Account Information */}
        <p className="mb-2">**Account Information**</p>
        <p>When you sign up for OdinBook, we collect information such as your name, email address, and username.</p>

        {/* Profile Information */}
        <p className="mb-2">**Profile Information**</p>
        <p>You may choose to provide additional information on your profile, such as a profile picture, cover photo, and personal details.</p>

        {/* Posts and Interactions */}
        <p className="mb-2">**Posts and Interactions**</p>
        <p>We collect information about the content you create, share, or interact with, including posts, comments, and likes.</p>

        {/* Device Information */}
        <p className="mb-2">**Device Information**</p>
        <p>We automatically collect information about your device, including your IP address, browser type, and operating system.</p>

        {/* Usage Data */}
        <p className="mb-2">**Usage Data**</p>
        <p>We collect information about how you use OdinBook, such as the features you interact with and the content you view.</p>
      </div>

      {/* How We Use Your Information */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>

        <p>We use your information for the following purposes:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>To provide and improve OdinBook's features and services.</li>
          <li>To personalize your experience on OdinBook.</li>
          <li>To communicate with you about updates, new features, or important notices.</li>
          <li>To analyze and monitor the usage patterns of OdinBook.</li>
        </ul>
      </div>

      {/* Sharing Your Information */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Sharing Your Information</h2>

        <p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following cases:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>With your consent.</li>
          <li>To comply with legal obligations.</li>
          <li>In response to lawful requests from government authorities.</li>
        </ul>
      </div>

      {/* Security */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Security</h2>

        <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</p>
      </div>

      {/* Your Choices */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Your Choices</h2>

        <p>You have the right to access, correct, or delete your personal information. You can manage your privacy settings within OdinBook.</p>
      </div>

      {/* Changes to this Privacy Policy */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Changes to this Privacy Policy</h2>

        <p>We may update this Privacy Policy from time to time. The latest version will be posted on the OdinBook website.</p>
      </div>

      {/* Contact Us */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>

        <p>If you have any questions or concerns about this Privacy Policy, please contact us at [syedshaon AT yahoo DOT com].</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

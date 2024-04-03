const IMAGEKIT_AUTH_END = import.meta.env.VITE_IMAGEKIT_AUTH_END;

const Authenticator = async () => {
  try {
    const response = await fetch("https://odinbookapi-production.up.railway.app/imagekit_auth");
    // const response = await fetch("http://localhost:3000/imagekit_auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default Authenticator;

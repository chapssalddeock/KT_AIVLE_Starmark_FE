import { useState } from 'react';
import NavBar2 from "../../src/components/NavBar/NavBar2";
import SignUp from "../../src/components/JoinMembership/Membership";
import Complete from "../../src/components/JoinMembership/Complete";

export default function Join() {
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setSubmitted(true);
  };

  return (
    <>
      <NavBar2 />
      {!submitted ? (
        <SignUp onSubmit={handleFormSubmit} />
      ) : (
        <Complete />
      )}
    </>

  )
}
import Head from "next/head";

import ContactsScene from "@/components/scenes/ContactsScene";

const ContactsPage = () => {
  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>
      <ContactsScene />
    </>
  );
};

export default ContactsPage
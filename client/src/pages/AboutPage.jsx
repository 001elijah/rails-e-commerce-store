const AboutPage = () => {
  return (
    <div className="sectionContainer">
      <p className="aboutText">
        The app mimics a quite simple e-commerce shop. A user can create an
        account. Both roles are allowed - admin or user - to create. Everyone
        can freely choose a role he or she wants for testing purposes. Admin
        entity has more previleges, i.e manage goods, see order history of all
        users, etc. User entity can only buy goods from the shop and access it's
        own orders history. By pressing "Confirm" button, a user "Pays" for the
        order, the order gets recorded to the DB.
      </p>
    </div>
  );
};

export default AboutPage;

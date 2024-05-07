import Card from "react-bootstrap/Card";
import React from "react";
import "./companyCard.css";

const CompanyCard = (company) => {
  console.log("company: ", company);
  return (
    <>
      <Card className="card">
        <Card.Title>{company.name}</Card.Title>
        {/* <Card.Img
          className="card-img"
          variant="top"
          src={`/upload/${props.image_url}`}
        /> */}
        <Card.Body>
          <Card.Text>major: {company.major}</Card.Text>
          <Card.Text>info: {company.info}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CompanyCard;

import React, { useState } from "react";
import {
  ListGroup,
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  Button,
} from "react-bootstrap";

const SearchBar = () => {
  return (
    <>
      <InputGroup className="mb-3">
        <Button variant="secondary" id="button-addon1">
          Search
        </Button>
        <FormControl
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </>
  );
};

export default SearchBar;

import React, {useState} from "react";
import {
    ListGroup,
    InputGroup,
    DropdownButton,
    Dropdown,
    FormControl,
    Button,
  } from 'react-bootstrap';

  const SearchBar = () => {
      return (
        <>
        <FormControl
          aria-label="Text input with dropdown button"
          placeholder="Search"
        />
        </>
      )
  }

  export default SearchBar;
import React from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

function NewAlertButton() {
  return (
    <Button type="primary">
      <Link to="/alerts/new">
        <Icon type="plus" style={{ fontSize: 16 }} />
        New Alert
      </Link>
    </Button>
  );
}

export default NewAlertButton;

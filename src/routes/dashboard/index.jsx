import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AppContainer } from '../../components/app-container';
import { Table } from '../../components/table';
import { TableHeader } from '../../components/table-header';
import { TableCell } from '../../components/table-cell';
import { TableRow } from '../../components/table-row';
import { Nav } from '../../components/nav';
import { Link } from 'react-router-dom';
import { ALL_USERS_QUERY } from '../../graphql/queries';
import { DELETE_USER_MUTATION, RESET_USERS_MUTATION } from '../../graphql/mutations';
import { Button } from '../../components/button';
import { ROLES } from '../../data/roles';

export const Dashboard = () => {
  const [selected, setSelected] = useState({});
  const { loading, error, data, refetch } = useQuery(ALL_USERS_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const [deleteUsers, { loading: mLoading }] = useMutation(DELETE_USER_MUTATION, {
    onCompleted() {
      refetch();
    },
  });
  const [resetUsers, { loading: rLoading }] = useMutation(RESET_USERS_MUTATION, {
    onCompleted() {
      refetch();
    },
  });

  function handleChange(e) {
    const email = e.target.value;
    const checked = e.target.checked;
    setSelected({
      ...selected,
      [email]: checked,
    });
  }

  if (loading || mLoading || rLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <AppContainer>
      <Nav
        title="Users"
        buttonText="Delete"
        state={Object.keys(selected).length === 0 ? Nav.state.disabled : Nav.state.danger}
        action={() => {
          deleteUsers({
            variables: {
              emails: Object.keys(selected),
            },
          });
        }}
      />
      <Table>
        <TableHeader />
        <tbody>
          {data.allUsers.map((user) => {
            const safeEmail = window.encodeURIComponent(user.email);

            return (
              <TableRow key={user.email}>
                <TableCell>
                  <input
                    name="bulk-action"
                    type="checkbox"
                    value={user.email}
                    checked={selected[user.email]}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <Link to={`/user/${safeEmail}`}>{user.email}</Link>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{ROLES.find((role) => role.value === user.role)['label']}</TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
      <Button variant={Button.VARIANTS.primary} onClick={resetUsers}>
        Reset
      </Button>
    </AppContainer>
  );
};

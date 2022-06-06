import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Link, useParams } from 'react-router-dom';
import { AppContainer } from '../../components/app-container';
import { Nav } from '../../components/nav';
import { Radio } from '../../components/radio';
import styles from './styles.module.css';
import { USER_QUERY } from '../../graphql/queries';
import { USER_MUTATION } from '../../graphql/mutations';
import { ROLES } from '../../data/roles';

export const UserDetail = () => {
  const { id } = useParams();
  const emailParam = window.decodeURIComponent(id);
  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: { email: emailParam },
    fetchPolicy: 'no-cache',
  });
  const [userData, setUserData] = useState({});
  const [saveUser, { loading: mLoading, error: mError }] = useMutation(USER_MUTATION);
  useEffect(() => {
    if (data) {
      setUserData({
        name: data.user.name,
        role: data.user.role,
      });
    }
  }, [data]);

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  if (loading || mLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return (
      <>
        <p>User not found</p>
        <p>
          Return to the <Link to="/">Dashboard</Link>
        </p>
      </>
    );
  }

  const { user } = data;

  return (
    <AppContainer>
      <Nav
        title={user.email}
        buttonText="Save"
        action={() => {
          saveUser({ variables: { email: user.email, newAttributes: userData } });
        }}
        state={Nav.state.primary}
      />
      {mError && <p>failed to update: {JSON.stringify(mError)}</p>}
      <form>
        <fieldset className={styles.fieldset}>
          <div className={styles.column}>
            <label className={styles.inputLabel} htmlFor="user-name">
              Name
            </label>
            <input
              className={styles.input}
              id="user-name"
              name="name"
              type="text"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.column}>
            {ROLES.map(({ label, value }) => {
              return (
                <Radio
                  key={value}
                  id={value}
                  label={label}
                  name="role"
                  value={value}
                  checked={userData.role === value}
                  onChange={handleChange}
                />
              );
            })}
          </div>
        </fieldset>
      </form>
    </AppContainer>
  );
};

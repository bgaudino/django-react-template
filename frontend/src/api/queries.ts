import {useQuery} from 'react-query';

async function whoAmI() {
  const res = await fetch('api/users/whoami/');
  return await res.json();
}

export function useWhoAmI() {
  return useQuery('whoami', whoAmI);
}

export async function login(email: string, password: string) {
  const res = await fetch('api/users/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (res.status === 400) {
    throw new Error('Invalid email or password');
  }
  return await res.json();
}

export async function logout() {
  const res = await fetch('api/users/logout/', {
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
    },
    method: 'POST',
  });
  return await res.json();
}

export async function register(
  email: string,
  password: string,
  confirmation: string
) {
  const res = await fetch('api/users/register/', {
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      confirmation,
    }),
  });
  const data = await res.json();
  if (res.status === 400) {
    if (Array.isArray(data)) {
      throw new Error(data.join('\n'));
    } else {
      throw new Error(
        Object.keys(data)
          .map((key) => {
            return data[key];
          })
          .join('\n')
      );
    }
  }
  return data;
}

function getCookie(name: string) {
  let cookieValue = '';
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

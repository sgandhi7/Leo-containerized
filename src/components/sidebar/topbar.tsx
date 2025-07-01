import { ClockIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@metrostar/comet-uswds';
import { APP_TITLE } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { Switch, useColorMode } from '@chakra-ui/react';

export const Topbar = (): React.ReactElement => {
  const navigate = useNavigate();

  const leoImage = '/img/leo.png';
  const loop_logo = '/img/loop_logo.png';
  //const [dark, setDark] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  // const bg = useColorModeValue('#00101f', '#0d1117');
  // const textColor = useColorModeValue('white', 'white');

  // useEffect(() => {
  //   if (user === undefined) {
  //     getUserInfo().then((userInfo) => setUser(userInfo));
  //   }

  //   const prefersDark =
  //     document.documentElement.getAttribute('data-theme') === 'dark';
  //   setDark(prefersDark);
  // }, [user, setUser]);

  // async function getUserInfo() {
  //   const response = await fetch('/.auth/me');
  //   const payload = await response.json();
  //   const { clientPrincipal } = payload;
  //   if (clientPrincipal) {
  //     const newUser = {
  //       firstName: '',
  //       lastName: '',
  //       displayName: '',
  //       emailAddress: clientPrincipal.userDetails,
  //       phoneNumber: '',
  //     };
  //     for (const claim of clientPrincipal.claims) {
  //       if (claim.typ === 'name') {
  //         newUser.displayName = claim.val;
  //         newUser.firstName = claim.val.split(/\s+/)[0];
  //         newUser.lastName = claim.val.split(/\s+/)[1];
  //       }
  //     }
  //     return newUser;
  //   }
  // }

  // function changeLightMode(value: boolean) {
  //   setDark(value);
  //   document.documentElement.setAttribute(
  //     'data-theme',
  //     value ? 'dark' : 'light',
  //   );
  //   localStorage.setItem('prefersDarkMode', value.toString());
  // }

  return (
    <nav
      style={{
        width: '100%',
        height: '70px',
        backgroundColor: '#00101f',
        color: 'white',
        padding: '10px 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 10000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Button variant="unstyled" onClick={() => navigate('/')} id={''}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={leoImage} alt="Leo Logo" height={40} width={40} />
            <span
              style={{ fontSize: '30px', color: 'white', fontWeight: 'bold' }}
            >
              {APP_TITLE}
            </span>
          </div>
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="unstyled"
            onClick={() => navigate('/history')}
            id={''}
          >
            <ClockIcon
              style={{ width: '35px', height: '35px', color: 'white' }}
            />
            <div style={{ fontSize: '12px', color: 'white', marginTop: '4px' }}>
              History
            </div>
          </Button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button variant="unstyled" onClick={() => navigate('/faqs')} id={''}>
            <QuestionMarkCircleIcon
              style={{
                width: '35px',
                height: '35px',
                color: 'white',
                marginTop: '4px',
              }}
            />
            <div
              style={{
                fontSize: '12px',
                color: 'white',
                marginTop: '4px',
                marginLeft: '7px',
              }}
            >
              FAQ
            </div>
          </Button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="unstyled"
            onClick={() =>
              window.open('https://loop.cloud.microsoft/...', '_blank')
            }
            id={''}
          >
            <img
              src={loop_logo}
              alt="Feedback"
              height={28}
              width={28}
              style={{ marginTop: '8px' }}
            />
            <div
              style={{
                marginTop: '9px',
                marginLeft: '-5px',
                fontSize: '12px',
                color: 'white',
              }}
            >
              Feedback
            </div>
          </Button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Switch
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            colorScheme="blue"
          />
          <div style={{ fontSize: '12px', color: 'white', marginTop: '5px' }}>
            Dark Mode
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;

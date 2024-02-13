import { Button, Icon } from '@metrostar/comet-uswds';
import useAuth from '@src/hooks/use-auth';
import { getAvatarInitials } from '@src/utils/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logomark from '/img/logo-mark.svg';
import logo from '/img/logo.svg';

export const Sidebar = (): React.ReactElement => {
  const navigate = useNavigate();
  const { isSignedIn, currentUserData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav id="sidebar-nav">
      {isSignedIn ? (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <div
            className={`width-full display-flex flex-column padding-top-1 ${isOpen ? 'flex-align-start' : 'flex-align-end'}`}
          >
            <div className="sidebar-btn-group">
              <Button
                id="home-btn"
                variant="unstyled"
                onClick={() => navigate('/')}
              >
                {isOpen ? (
                  <img
                    className="usa__logo"
                    src={logo}
                    alt="Horizon Hunt Logo"
                    height={28}
                    style={{ marginLeft: '-1px' }}
                  />
                ) : (
                  <img
                    className="usa__logo"
                    src={logomark}
                    alt="Horizon Hunt Logo"
                    height={28}
                    style={{ marginLeft: '3px' }}
                  />
                )}
              </Button>
              <div>
                <Button
                  id="toggle-btn"
                  variant="unstyled"
                  onClick={toggleSidebar}
                >
                  <Icon
                    id="expand-collapse-icon"
                    type={isOpen ? 'navigate_far_before' : 'navigate_far_next'}
                    className="text-white"
                    size="size-4"
                  />
                  {isOpen ? (
                    <span className="sidebar-text text-white">Collapse</span>
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
            </div>
            <hr className="width-full" />
            <div className="sidebar-btn-group">
              <div>
                <Button
                  id="history-btn"
                  variant="unstyled"
                  onClick={() => navigate('/history')}
                >
                  <Icon
                    id="history-icon"
                    type="history"
                    className="text-white"
                    size="size-4"
                  />
                  {isOpen ? (
                    <span className="sidebar-text text-white">History</span>
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
              <div>
                <Button
                  id="faqs-btn"
                  variant="unstyled"
                  onClick={() => navigate('/faqs')}
                >
                  <Icon
                    id="faqs-icon"
                    type="help_outline"
                    className="text-white"
                    size="size-4"
                  />
                  {isOpen ? (
                    <span className="sidebar-text text-white">FAQs</span>
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
            </div>
          </div>
          {currentUserData ? (
            <div className="sidebar-profile">
              <div className="sidebar-profile-avatar">
                <span className="sidebar-profile-initials">
                  {getAvatarInitials(currentUserData)}
                </span>
                {isOpen ? (
                  <span className="sidebar-profile-name text-white">
                    {currentUserData.firstName}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Sidebar;

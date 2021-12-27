import cx from 'classnames';
import React from 'react';
import Link from 'next/link';
import { absoluteToRelativeDate } from '../../../utils';
import styles from './Messages.module.css';
import { useDispatch, useSelect } from '@wordpress/data';
import '../../../stores/messagesStore';

function UserSection() {
  return (
    <div className={styles.userSection}>
      <div className={styles.emptyUserName}></div>
      <div className={styles.usernameIconSection}>
        <p>
          <strong>7kami_me</strong>
        </p>
        <svg
          aria-label="Down Chevron Icon"
          className={styles.arrowDownIcon}
          color="#262626"
          fill="#262626"
          height="20"
          role="img"
          viewBox="0 0 48 48"
          width="20"
        >
          <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
        </svg>
      </div>
      <svg
        aria-label="New message"
        className={styles.sendMessageIcon}
        color="#262626"
        fill="#262626"
        height="24"
        role="img"
        viewBox="0 0 44 44"
        width="24"
      >
        <path d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"></path>
        <path d="M17.5 34.82h-6.7a1.5 1.5 0 01-1.5-1.5v-6.7a1.5 1.5 0 01.44-1.06L34.1 1.26a4.45 4.45 0 016.22 0l2.5 2.5a4.45 4.45 0 010 6.22l-24.3 24.4a1.5 1.5 0 01-1.02.44zm-5.2-3h4.58l23.86-24a1.45 1.45 0 000-2l-2.5-2.5a1.45 1.45 0 00-2 0l-24 23.86z"></path>
        <path d="M38.2 14.02a1.51 1.51 0 01-1.1-.44l-6.56-6.56a1.5 1.5 0 012.12-2.12l6.6 6.6a1.49 1.49 0 010 2.12 1.51 1.51 0 01-1.06.4z"></path>
      </svg>
    </div>
  );
}
function SenderSection({ fromUserId }) {
  const messagesData = useSelect((select) =>
    select('ig-messages').getMessages(fromUserId, [
      'from_user_id',
      'from_user_thumbnail',
      'from_username',
    ])
  );

  return (
    <div className={styles.sendersSection}>
      {messagesData.map((user) => (
        <Link key={user.from_user_id} href={`/direct/t/${user.from_user_id}`}>
          <a
            className={cx(styles.senderInfo, {
              [styles.isSent]: user.from_user_id === fromUserId,
            })}
          >
            <img
              className={styles.senderThumbnail}
              src={user.from_user_thumbnail}
              alt="sender avatar"
            />
            <div>
              <p className={styles.senderUsername}>{user.from_username}</p>
              <p className={styles.hasSentMessage}>
                Active{' '}
                {absoluteToRelativeDate(
                  user.messages[user.messages.length - 1].sent_on
                )}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
export function Messages({ fromUserId }) {
  const messagesData = useSelect((select) =>
    select('ig-messages').getMessages(fromUserId)
  );
  const userIndex = messagesData?.findIndex(
    (user) => user.from_user_id === fromUserId
  );

  const date = new Date(
    messagesData[userIndex]?.messages[
      messagesData[userIndex]?.messages.length - 1
    ].sent_on
  );
  const { setMessageFieldText } = useDispatch('ig-messages');
  const { submitMessage } = useDispatch('ig-messages');
  const messageFieldText = useSelect((select) =>
    select('ig-messages').getMessageFieldText()
  );
  return (
    <>
      <div className={styles.messagesPageContainer}>
        <div className={styles.leftSection}>
          <UserSection />
          <SenderSection messagesData={messagesData} fromUserId={fromUserId} />
        </div>

        {fromUserId ? (
          <div className={styles.rightSection}>
            <div className={styles.messagesHeader}>
              <img
                src={messagesData[userIndex]?.from_user_thumbnail}
                alt="sender avatar"
                className={styles.messagesSenderAvatar}
              />
              <div className={styles.messagesSenderUserInfo}>
                <p className={styles.messagesSenderUsername}>
                  <strong>{messagesData[userIndex]?.from_username}</strong>
                </p>
                <p className={styles.whenWasActive}>Active 20min ago</p>
              </div>
              <svg
                aria-label="View thread details"
                color="#262626"
                height="24"
                role="img"
                viewBox="0 0 48 48"
                width="24"
              >
                <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
                <circle
                  clipRule="evenodd"
                  cx="24"
                  cy="14.8"
                  fillRule="evenodd"
                  r="2.6"
                ></circle>
                <path d="M27.1 35.7h-6.2c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h6.2c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path>
                <path d="M24 35.7c-.8 0-1.5-.7-1.5-1.5V23.5h-1.6c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5H24c.8 0 1.5.7 1.5 1.5v12.2c0 .8-.7 1.5-1.5 1.5z"></path>
              </svg>
            </div>
            <div className={styles.messagesSection}>
              <div
                className={styles.messagesBody}
                ref={(div) => div && (div.scrollTop = 100000)}
              >
                {messagesData.length > 0 && (
                  <p className={styles.lastMessageSentDate}>
                    {date.toLocaleString('en-us', {
                      month: 'long',
                      day: '2-digit',
                    })}
                    ,&nbsp;
                    {date.toLocaleString('en-us', {
                      timeStyle: 'medium',
                    })}
                  </p>
                )}

                {messagesData[userIndex]?.messages.map((message, index) => {
                  const nextMessage = index + 1;
                  return (
                    <div
                      className={cx(styles.messagesUserThumbnailMessageText, {
                        [styles.isSent]: message.direction === 'sent',
                      })}
                    >
                      {message.direction !==
                        messagesData[userIndex]?.messages[nextMessage]
                          ?.direction && message.direction !== 'sent' ? (
                        <img
                          src={messagesData[userIndex].from_user_thumbnail}
                          alt="sender profile pic"
                          className={styles.messagesSenderAvatar}
                        />
                      ) : (
                        <div className={styles.emptyImg}></div>
                      )}
                      <p
                        className={cx(styles.messageText, {
                          [styles.isSent]: message.direction === 'sent',
                        })}
                      >
                        {message.message_body}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.messagesInputSection}>
                <div className={styles.messagesInputContent}>
                  <svg
                    aria-label="Emoji"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
                    <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
                  </svg>
                  <form
                    className={styles.inputForm}
                    onSubmit={(event) => {
                      event.preventDefault();
                      submitMessage(userIndex);
                    }}
                  >
                    <input
                      name="messageBody"
                      type="text"
                      placeholder="Message..."
                      className={styles.messagesInput}
                      onChange={(e) => {
                        setMessageFieldText(e.target.value);
                      }}
                      value={messageFieldText}
                    />

                    <button
                      className={cx(styles.sendButton, {
                        [styles.isText]: messageFieldText !== '',
                      })}
                    >
                      {messageFieldText !== '' ? (
                        'Send'
                      ) : (
                        <svg
                          aria-label="Add Photo or Video"
                          fill="#262626"
                          height="24"
                          role="img"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <path d="M38.5 0h-29C4.3 0 0 4.3 0 9.5v29C0 43.7 4.3 48 9.5 48h29c5.2 0 9.5-4.3 9.5-9.5v-29C48 4.3 43.7 0 38.5 0zM45 38.5c0 3.6-2.9 6.5-6.5 6.5h-29c-3.3 0-6-2.5-6.4-5.6l8.3-8.3c.1-.1.3-.2.4-.2.1 0 .2 0 .4.2l6.3 6.3c1.4 1.4 3.6 1.4 5 0L35.9 25c.2-.2.6-.2.8 0l8.3 8.3v5.2zm0-9.4l-6.2-6.2c-1.3-1.3-3.7-1.3-5 0L21.3 35.3c-.1.1-.3.2-.4.2-.1 0-.2 0-.4-.2L14.2 29c-1.3-1.3-3.7-1.3-5 0L3 35.2V9.5C3 5.9 5.9 3 9.5 3h29C42.1 3 45 5.9 45 9.5v19.6zM11.8 8.2c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z"></path>
                        </svg>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.sendMessagesSection}>
            <div className={styles.telegramIconContainer}>
              <svg
                aria-label="Direct"
                className={styles.telegramIcon}
                color="#262626"
                height="55"
                role="img"
                viewBox="0 0 48 48"
                width="55"
              >
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
              </svg>
            </div>
            <p className={styles.yourMessages}>Your messages</p>
            <p className={styles.sendAMessage}>
              Send private photos and messages to a friend or group
            </p>
            <button className={styles.sendMessageButton}>Send message</button>
          </div>
        )}
      </div>
    </>
  );
}

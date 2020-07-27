import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Custom Components Here
import { Announcement } from "./Announcement"

const data = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetu adipiscing elit, sed do eiusmod ",
    datetime: "JANUARY 23, 2020 11:47",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetu adipiscing elit, sed do eiusmod ",
    datetime: "JANUARY 23, 2020 11:47",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetu adipiscing elit, sed do eiusmod ",
    datetime: "JANUARY 23, 2020 11:47",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetu adipiscing elit, sed do eiusmod ",
    datetime: "JANUARY 23, 2020 11:47",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetu adipiscing elit, sed do eiusmod ",
    datetime: "JANUARY 23, 2020 11:47",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  }
];

export const AnnouncementContainer = (props) => {
  const { announcements } = props
  return (
    <Announcement announcements={announcements} />
  )
}

const mapStateToProps = (state, props) => {
  const announcements = data;
  return { announcements };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementContainer)

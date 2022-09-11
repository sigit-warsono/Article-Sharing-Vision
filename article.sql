-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 11, 2022 at 12:15 PM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `article`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(120) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `created_date` timestamp NOT NULL,
  `updated_date` timestamp NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `category`, `created_date`, `updated_date`, `status`) VALUES
(1, 'What\'s it like to be a PHP Developer?', 'A PHP Developer is a Software Developer who specialises in the design, testing and implementation of software using the PHP programming language. PHP (Hypertext Preprocessor) is a scripting language that allows developers to write dynamically generated content quickly and is commonly used to add additional functionality to web pages.', 'php developer', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'publish'),
(14, 'How to Become a React Developer in 3 Steps', 'A React developer designs and creates JavaScript-based applications for web or mobile environments. They typically specialize in front-end development. React is an open-source JavaScript library. It is sometimes referred to as React.js or ReactJS. In programming, libraries serve as toolkits for developers. Their contents may include configuration data, prewritten code, and message templates. ', 'React Developer', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'publish'),
(24, 'Celebrate #JavaScript25 with stronger skills', 'Begin learning here by typing in your first name surrounded by quotation marks, and ending with a semicolon. For example, you could type the name \"Jamie\";  and then hit enter. Breathe in. Breathe out. Turn your JavaScript frustrations into 3 minutes of Zen.', 'javascript', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'trash'),
(25, 'react-formio can be used on the server, or bundled for the client using an npm-compatible packaging system such as Brows', 'The form component is the primary component of the system. It is what takes the form definition (json) and renders the form into html. There are multiple ways to send the form to the Form component. The two main ways are to pass the src prop with a url to the form definition, usually a form.io server. The other is to pass the form prop with the json definition and optionally a url prop with the location of the form.', 'form', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'drafts');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

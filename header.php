<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
	<a href="#main-navigation" id="toggle-menu">MENU</a>
	<div id="carbon"></div>
	<nav id="main-navigation"><?php wp_nav_menu(array('theme_location' => 'principal'));?></nav>
	<h1 class="site-title"><?php bloginfo('name');?></h1>
</header>
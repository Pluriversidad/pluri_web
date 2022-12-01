<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	
	<?php wp_head(); ?>
</head>

<body 
<?php 
	$inside_class = !is_front_page() && !is_page_template('page-institutos.php') ? 'inside' : 'home-pluri';
	body_class($inside_class); ?>
>
<?php wp_body_open(); ?>
<header class="site-header">
	<div class="site-header-wrapper">
	<h1 class="site-title"><a href="<?php bloginfo('url');?>"><img title="<?php bloginfo('title');?>" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40.35 21.6'%3E%3Cg id='Capa_2' data-name='Capa 2'%3E%3Cg id='Capa_1-2' data-name='Capa 1'%3E%3Cpath d='M.47.18a.18.18,0,0,1,0-.13A.17.17,0,0,1,.64,0H3.06a1.53,1.53,0,0,1,.49.08A1.3,1.3,0,0,1,4,.28a1.64,1.64,0,0,1,.35.3A2,2,0,0,1,4.59,1a2.26,2.26,0,0,1,.17.43,2.31,2.31,0,0,1,0,.46,1.88,1.88,0,0,1-.12.66,1.85,1.85,0,0,1-.35.59,2.08,2.08,0,0,1-.55.41,1.6,1.6,0,0,1-.7.16H1.94v1.8c0,.11-.06.17-.18.17H.64a.21.21,0,0,1-.12,0,.17.17,0,0,1-.05-.13ZM3.33,1.84a.93.93,0,0,0,0-.23.82.82,0,0,0-.12-.2A.65.65,0,0,0,3,1.26a.7.7,0,0,0-.25-.05h-.8V2.47h.8A.66.66,0,0,0,3,2.42a.86.86,0,0,0,.18-.14.72.72,0,0,0,.12-.21A.85.85,0,0,0,3.33,1.84Z'/%3E%3Cpath d='M5.5.17a.17.17,0,0,1,0-.12.17.17,0,0,1,.12,0H6.8a.16.16,0,0,1,.11.05A.14.14,0,0,1,7,.17V4.29H9.06a.16.16,0,0,1,.11,0,.13.13,0,0,1,.05.12v1a.19.19,0,0,1,0,.12.23.23,0,0,1-.12.06H5.67a.15.15,0,0,1-.17-.17Z'/%3E%3Cpath d='M11.56,3.39a1.35,1.35,0,0,0,.07.48,1,1,0,0,0,.21.32.75.75,0,0,0,.3.18,1.34,1.34,0,0,0,.35,0,1.13,1.13,0,0,0,.36-.06.84.84,0,0,0,.29-.2.91.91,0,0,0,.2-.33,1.15,1.15,0,0,0,.08-.44V.17a.16.16,0,0,1,.05-.12.17.17,0,0,1,.12,0H14.7a.18.18,0,0,1,.14.06.16.16,0,0,1,.05.11v3.2a2.79,2.79,0,0,1-.2,1.11,1.9,1.9,0,0,1-.52.73,2.08,2.08,0,0,1-.77.39,3.51,3.51,0,0,1-1.82,0,2,2,0,0,1-.77-.4,2,2,0,0,1-.53-.73,2.78,2.78,0,0,1-.19-1.1V.17a.15.15,0,0,1,0-.11A.14.14,0,0,1,10.24,0h1.13a.21.21,0,0,1,.12.05.13.13,0,0,1,.07.12Z'/%3E%3Cpath d='M16,.18a.19.19,0,0,1,0-.13.14.14,0,0,1,.12,0h2.45a1.77,1.77,0,0,1,.73.15,1.91,1.91,0,0,1,.6.4,1.82,1.82,0,0,1,.4.58,1.75,1.75,0,0,1,.14.72,1.61,1.61,0,0,1-.07.49,1.66,1.66,0,0,1-.19.43,1.52,1.52,0,0,1-.3.37,1.82,1.82,0,0,1-.38.29l1,1.83.07.13a.34.34,0,0,1,0,.12.1.1,0,0,1,0,.09.14.14,0,0,1-.11,0h-1.3a.28.28,0,0,1-.12,0A.21.21,0,0,1,19,5.5l-.92-1.74h-.62V5.47a.15.15,0,0,1-.17.17H16.16a.21.21,0,0,1-.12,0,.17.17,0,0,1,0-.13Zm3,1.68a.66.66,0,0,0,0-.23.82.82,0,0,0-.12-.2.55.55,0,0,0-.18-.16.65.65,0,0,0-.23-.09h-.93v1.4h.94a.49.49,0,0,0,.24-.08.65.65,0,0,0,.18-.15,1,1,0,0,0,.11-.21A1,1,0,0,0,19,1.86Z'/%3E%3Cpath d='M21.34.17a.19.19,0,0,1,0-.12.17.17,0,0,1,.12,0h1.12a.21.21,0,0,1,.12.05.15.15,0,0,1,.07.12v5.3c0,.11-.07.17-.19.17H21.5c-.11,0-.16-.06-.16-.17Z'/%3E%3Cpath d='M2.09,13.5,2,13.36,2,13.21,0,8.12v0a0,0,0,0,1,0,0C0,8,.05,8,.14,8H1.36a.19.19,0,0,1,.2.14l1.16,3.45c.1-.29.2-.57.29-.86s.19-.58.28-.86.19-.58.28-.87l.3-.86A.2.2,0,0,1,4.08,8h1.2A.19.19,0,0,1,5.4,8a.12.12,0,0,1,0,.08.1.1,0,0,1,0,0v0l-2,5.09,0,.12-.06.12a.34.34,0,0,1-.08.09.14.14,0,0,1-.1,0H2.25A.17.17,0,0,1,2.09,13.5Z'/%3E%3Cpath d='M6.12,8.12a.18.18,0,0,1,0-.13.16.16,0,0,1,.12,0h3.77a.15.15,0,0,1,.13,0,.17.17,0,0,1,0,.13v.94a.19.19,0,0,1,0,.12.17.17,0,0,1-.14.06H7.59v.94H9.48a.21.21,0,0,1,.12,0,.14.14,0,0,1,.05.12v.81a.25.25,0,0,1,0,.11.17.17,0,0,1-.12.05H7.59v1h2.54a.15.15,0,0,1,.17.17v1a.09.09,0,0,1,0,.07c0,.07-.06.11-.15.11H6.28a.21.21,0,0,1-.12,0,.16.16,0,0,1,0-.12Z'/%3E%3Cpath d='M11.25,8.12a.18.18,0,0,1,0-.13.15.15,0,0,1,.12,0h2.45a1.76,1.76,0,0,1,.73.14,1.91,1.91,0,0,1,.6.4,1.94,1.94,0,0,1,.4.58,1.79,1.79,0,0,1,.15.72,2,2,0,0,1-.07.49,2.19,2.19,0,0,1-.2.44,1.69,1.69,0,0,1-.3.36,2.06,2.06,0,0,1-.37.29l1,1.83.07.13a.24.24,0,0,1,0,.12.13.13,0,0,1,0,.1.18.18,0,0,1-.11,0h-1.3a.15.15,0,0,1-.11,0,.14.14,0,0,1-.07-.1l-.92-1.74h-.62v1.72a.15.15,0,0,1-.17.16H11.41a.21.21,0,0,1-.12,0,.16.16,0,0,1,0-.12Zm3,1.68a.57.57,0,0,0,0-.22.53.53,0,0,0-.11-.21,1,1,0,0,0-.19-.16.63.63,0,0,0-.23-.08l-.2,0h-.73V10.5h.94a.61.61,0,0,0,.24-.07.93.93,0,0,0,.18-.16,1,1,0,0,0,.11-.21A.93.93,0,0,0,14.21,9.8Z'/%3E%3Cpath d='M17.28,11.76a1.53,1.53,0,0,1,.17.14,2,2,0,0,0,.61.38,1.09,1.09,0,0,0,.4.07,1.32,1.32,0,0,0,.32,0,.53.53,0,0,0,.21-.12A.39.39,0,0,0,19.1,12a.64.64,0,0,0,0-.2.29.29,0,0,0-.09-.21,1,1,0,0,0-.22-.16,1.69,1.69,0,0,0-.27-.13l-.24-.08a6.87,6.87,0,0,1-.8-.34,2.8,2.8,0,0,1-.56-.41,1.52,1.52,0,0,1-.35-.5,1.64,1.64,0,0,1-.11-.6,1.47,1.47,0,0,1,.14-.64,1.41,1.41,0,0,1,.41-.5,2,2,0,0,1,.63-.31,2.73,2.73,0,0,1,.83-.12,2.93,2.93,0,0,1,.67.08,2.52,2.52,0,0,1,.62.25,1.43,1.43,0,0,1,.24.16,1.92,1.92,0,0,1,.21.16.92.92,0,0,1,.14.14.24.24,0,0,1,.05.12.16.16,0,0,1,0,.09.28.28,0,0,1-.07.09l-.58.62a.21.21,0,0,1-.13.07.17.17,0,0,1-.1,0l-.09-.08,0,0a1.26,1.26,0,0,0-.17-.13A1.37,1.37,0,0,0,19,9.2l-.22-.09-.24,0a.86.86,0,0,0-.23,0,.59.59,0,0,0-.2.06.37.37,0,0,0-.13.12.35.35,0,0,0-.05.18.38.38,0,0,0,.05.19.56.56,0,0,0,.16.14,1.13,1.13,0,0,0,.27.13l.36.12a7.71,7.71,0,0,1,.74.28,2.25,2.25,0,0,1,.59.35,1.61,1.61,0,0,1,.39.47,1.54,1.54,0,0,1,.13.67,1.6,1.6,0,0,1-.17.76,1.65,1.65,0,0,1-.47.58,2.12,2.12,0,0,1-.7.37,2.63,2.63,0,0,1-.86.13,2.34,2.34,0,0,1-.86-.16,3.23,3.23,0,0,1-.78-.41,3.28,3.28,0,0,1-.26-.22l-.16-.17h-.05a.33.33,0,0,1-.08-.16.23.23,0,0,1,.08-.14l.66-.63a.31.31,0,0,1,.13-.05.1.1,0,0,1,.07,0A.28.28,0,0,1,17.28,11.76Z'/%3E%3Cpath d='M21.57,8.11a.15.15,0,0,1,0-.11.12.12,0,0,1,.12,0h1.12A.19.19,0,0,1,23,8a.14.14,0,0,1,.06.12v5.3c0,.11-.06.17-.18.17H21.73c-.11,0-.16-.06-.16-.17Z'/%3E%3Cpath d='M29.13,10.77a2.68,2.68,0,0,1-.1.76,3.16,3.16,0,0,1-.29.68,3.11,3.11,0,0,1-1,1,2.61,2.61,0,0,1-.69.27,2.86,2.86,0,0,1-.77.1H24.37a.21.21,0,0,1-.12,0,.14.14,0,0,1-.06-.13V8.12a.19.19,0,0,1,0-.13.17.17,0,0,1,.13,0h1.87A3.32,3.32,0,0,1,27,8a3.44,3.44,0,0,1,.69.28,3.06,3.06,0,0,1,.58.44,2.8,2.8,0,0,1,.46.57A3,3,0,0,1,29,10,2.68,2.68,0,0,1,29.13,10.77ZM25.66,9.3v2.92h.66a1.39,1.39,0,0,0,.53-.14,1.45,1.45,0,0,0,.43-.3,1.36,1.36,0,0,0,.39-1,1.4,1.4,0,0,0-.12-.58,1.52,1.52,0,0,0-.32-.46,1.37,1.37,0,0,0-.48-.31,1.67,1.67,0,0,0-.59-.11Z'/%3E%3Cpath d='M31.28,8.09l0-.05.05,0,.07,0h1a.14.14,0,0,1,.11,0,.23.23,0,0,1,.07.07l.1.21,2,5.14a.12.12,0,0,1,0,.12.21.21,0,0,1-.15.05H33.47a.25.25,0,0,1-.13,0,.21.21,0,0,1-.07-.11c-.06-.13-.1-.26-.15-.39L33,12.67H31l-.15.38-.14.39a.2.2,0,0,1-.2.14H29.36a.16.16,0,0,1-.12,0s0-.06,0-.11ZM32,9.72l-.15.41c-.05.15-.1.3-.14.46l-.15.45-.15.41h1.17Z'/%3E%3Cpath d='M40.35,10.77a2.68,2.68,0,0,1-.1.76,3.16,3.16,0,0,1-.29.68,2.8,2.8,0,0,1-1.73,1.27,2.86,2.86,0,0,1-.77.1H35.59a.21.21,0,0,1-.12,0,.14.14,0,0,1-.06-.13V8.12A.19.19,0,0,1,35.46,8a.16.16,0,0,1,.13,0h1.87a3.17,3.17,0,0,1,.76.1,3.3,3.3,0,0,1,.7.28,3.06,3.06,0,0,1,.58.44,2.46,2.46,0,0,1,.45.57,2.6,2.6,0,0,1,.3.68A2.68,2.68,0,0,1,40.35,10.77ZM36.88,9.3v2.92h.66a1.39,1.39,0,0,0,.53-.14,1.45,1.45,0,0,0,.43-.3,1.36,1.36,0,0,0,.39-1,1.4,1.4,0,0,0-.12-.58,1.52,1.52,0,0,0-.32-.46A1.37,1.37,0,0,0,38,9.41a1.67,1.67,0,0,0-.59-.11Z'/%3E%3Cpath d='M.56,16.05a.15.15,0,0,1,0-.11.13.13,0,0,1,.12,0H2l.11,0a.19.19,0,0,1,.1.1l1,1.53,1,1.53V16a.17.17,0,0,1,.06-.1.14.14,0,0,1,.11,0H5.34a.2.2,0,0,1,.13,0,.17.17,0,0,1,0,.12v5.32a.12.12,0,0,1,0,.11.18.18,0,0,1-.13,0H4.14a.16.16,0,0,1-.09,0L4,21.4q-.5-.84-1-1.65L2,18.1v3.25a.22.22,0,0,1,0,.13.18.18,0,0,1-.14,0H.72a.15.15,0,0,1-.16-.16Z'/%3E%3Cpath d='M6.5,18.71a2.76,2.76,0,0,1,.1-.77,3.33,3.33,0,0,1,.29-.7,3,3,0,0,1,1-1,3.48,3.48,0,0,1,.69-.29,2.79,2.79,0,0,1,1.55,0,3.25,3.25,0,0,1,.69.29,3.28,3.28,0,0,1,.59.45,2.8,2.8,0,0,1,.45.59,2.9,2.9,0,0,1,.3.7,2.76,2.76,0,0,1,.1.77,2.8,2.8,0,0,1-.1.77,2.67,2.67,0,0,1-.3.69,2.56,2.56,0,0,1-.45.59,3.28,3.28,0,0,1-.59.45,2.8,2.8,0,0,1-.69.29,3.05,3.05,0,0,1-1.55,0,3,3,0,0,1-.69-.29,3.21,3.21,0,0,1-.58-.45,2.93,2.93,0,0,1-.46-.59,3,3,0,0,1-.29-.69A2.8,2.8,0,0,1,6.5,18.71Zm1.46,0a1.58,1.58,0,0,0,.11.58,1.39,1.39,0,0,0,.3.48,1.6,1.6,0,0,0,.45.32,1.4,1.4,0,0,0,.58.11,1.32,1.32,0,0,0,.57-.11,1.52,1.52,0,0,0,.46-.32,1.39,1.39,0,0,0,.3-.48,1.57,1.57,0,0,0,.1-.58,1.63,1.63,0,0,0-.1-.59,1.5,1.5,0,0,0-.3-.48,1.36,1.36,0,0,0-.46-.32,1.32,1.32,0,0,0-.57-.12,1.4,1.4,0,0,0-.58.12,1.42,1.42,0,0,0-.45.32,1.5,1.5,0,0,0-.3.48A1.63,1.63,0,0,0,8,18.71Zm1.18-4.35a.17.17,0,0,1,.08-.12.28.28,0,0,1,.12,0h1a.12.12,0,0,1,.09,0,.09.09,0,0,1,0,0,.22.22,0,0,1,0,.08l0,.09-.37.81a.31.31,0,0,1-.09.12.16.16,0,0,1-.12,0H9a.1.1,0,0,1-.08,0,.14.14,0,0,1,0-.07s0-.06,0-.09a.37.37,0,0,0,0-.09Z'/%3E%3Cpath d='M13.54,16.05a.16.16,0,0,1,.05-.11.15.15,0,0,1,.13,0H15a.18.18,0,0,1,.19.14l1,3.45,1-3.45a.19.19,0,0,1,.19-.14h1.3a.16.16,0,0,1,.12,0,.14.14,0,0,1,.06.11c.09.89.18,1.78.27,2.65s.19,1.76.28,2.65v0c0,.1-.06.15-.17.15H18.27a.17.17,0,0,1-.19-.17l-.33-2.93-.85,2.95a.14.14,0,0,1,0,.09s-.07.06-.1.06h-1a.12.12,0,0,1-.09-.06.16.16,0,0,1-.06-.09l-.85-2.94-.33,2.92a.17.17,0,0,1-.19.17H13.16c-.11,0-.16-.06-.16-.17Z'/%3E%3Cpath d='M22.12,16s0,0,0,0l.05-.05.06,0h1a.15.15,0,0,1,.11,0,.46.46,0,0,1,.07.07l.09.21,2,5.14a.1.1,0,0,1,0,.12.18.18,0,0,1-.14.05H24.32a.29.29,0,0,1-.14,0,.23.23,0,0,1-.07-.11L24,21c-.05-.12-.09-.25-.14-.38h-2c0,.13-.09.26-.14.38l-.15.39a.18.18,0,0,1-.19.14H20.2a.16.16,0,0,1-.12,0,.09.09,0,0,1,0-.11Zm.69,1.62-.14.42-.15.45c-.05.15-.1.3-.14.45l-.15.41h1.16Z'/%3E%3Cpath d='M31.2,18.71a2.68,2.68,0,0,1-.11.76,2.58,2.58,0,0,1-.29.68,3.14,3.14,0,0,1-.45.57,2.79,2.79,0,0,1-.59.43,2.61,2.61,0,0,1-.69.27,2.8,2.8,0,0,1-.77.1H26.43a.27.27,0,0,1-.12,0s0-.06,0-.13v-5.3a.2.2,0,0,1,0-.13.17.17,0,0,1,.13,0H28.3a3.25,3.25,0,0,1,.77.1,3,3,0,0,1,.69.28,2.8,2.8,0,0,1,1,1,3,3,0,0,1,.29.68A2.68,2.68,0,0,1,31.2,18.71Zm-3.48-1.46v2.91h.49l.17,0a1.34,1.34,0,0,0,.53-.14,1.19,1.19,0,0,0,.43-.3,1.35,1.35,0,0,0,.29-.44,1.6,1.6,0,0,0,0-1.14,1.39,1.39,0,0,0-.33-.46,1.72,1.72,0,0,0-.48-.31,1.61,1.61,0,0,0-.58-.1Z'/%3E%3Cpath d='M33.34,16a.05.05,0,0,1,0,0,.12.12,0,0,1,.05-.05l.06,0h1a.15.15,0,0,1,.11,0l.07.07.09.21,2,5.14a.1.1,0,0,1,0,.12.2.2,0,0,1-.14.05H35.54a.26.26,0,0,1-.14,0,.23.23,0,0,1-.07-.11L35.18,21c0-.12-.1-.25-.14-.38H33c0,.13-.09.26-.14.38l-.15.39a.19.19,0,0,1-.19.14H31.42a.16.16,0,0,1-.12,0,.09.09,0,0,1,0-.11ZM34,17.66c-.05.13-.09.27-.14.42l-.15.45-.15.45c-.05.14-.09.28-.14.41h1.16Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E" /></a></h1>

	<nav id="main-navigation" class="collapsed">
		<?php wp_nav_menu(array('theme_location' => 'principal'));?>
		<?php wp_nav_menu(array('theme_location' => 'icon_links'));?>
	</nav>
	<nav id="desktop-menu">
		<?php wp_nav_menu(array('theme_location' => 'principal'));?>
		<?php //wp_nav_menu(array('theme_location' => 'icon_links'));?>	
	</nav>
	
	<a title="Ver navegación" href="#main-navigation" id="toggle-menu">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</a>
	</div>
</header>
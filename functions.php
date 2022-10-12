<?php
//functions

define('PLURI_VERSION', '0.1.1');

function pluri_styles() {
	wp_enqueue_style( 'pluri_frontend', get_bloginfo('template_url') . '/public/frontend.css', array(), PLURI_VERSION, 'screen' );
	wp_enqueue_script('pluri_js', get_bloginfo('template_url') . '/public/bundle.js', array(), PLURI_VERSION, true);
}
add_action( 'wp_enqueue_scripts', 'pluri_styles' );

add_theme_support( 'html5' );
add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'title-tag' );

register_nav_menus(
	array(
		'principal' => esc_html__( 'Principal', 'pluri_landing' ),
	)
);
<?php
//functions

define('PLURI_VERSION', '0.2.8');

function pluri_styles() {
	wp_enqueue_style( 'pluri_frontend', get_bloginfo('template_url') . '/public/frontend_v028.css', array(), PLURI_VERSION, 'screen' );
	wp_enqueue_script('pluri_js', get_bloginfo('template_url') . '/public/bundle_v028.js', array(), PLURI_VERSION, true);
}
add_action( 'wp_enqueue_scripts', 'pluri_styles' );

add_theme_support( 'html5' );
add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'title-tag' );

register_nav_menus(
	array(
		'principal' => esc_html__( 'Principal', 'pluri_landing' ),
		'icon_links'=> esc_html__( 'Links', 'pluri_landing')
	)
);

add_filter( 'get_the_archive_title', function ( $title ) {
	global $post;

    if( is_post_type_archive() ) {
    	$ptypeobj = get_post_type_object(get_post_type( $post->ID ));
        $title = $ptypeobj->labels->name;
    }

    return $title;
});


function tag_filter($query) {
  if ( !is_admin() ) {
    if ($query->is_tag) {
      $query->set('post_type', array( 'post', 'calendario', 'cursos', 'cuaderno_de_notas', 'formaciones', 'red_y_consejo' ));
    }
  }
}
add_action('pre_get_posts','tag_filter');

function pluri_custom_mime_types( $mimes ) {
	
	// New allowed mime types.
	$mimes['md']  = 'text/markdown';
	$mimes['markdown'] = 'text/markdown';
	
	return $mimes;

}

add_filter( 'upload_mimes', 'pluri_custom_mime_types' );
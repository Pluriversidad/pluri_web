<?php
//functions

define('PLURI_VERSION', '0.3.8');
define('PLURI_TYPES', ['cursos', 'formaciones', 'cuaderno_de_notas', 'red_y_consejo', 'calendario', 'recursos_pedagogicos']);

function pluri_styles()
{
	$cssFilePath = glob(get_template_directory() . '/public/pluri.*.css');
	$cssFileURI = get_template_directory_uri() . '/public/' . basename($cssFilePath[0]);
	wp_enqueue_style('pluri_frontend', $cssFileURI, array(), PLURI_VERSION, 'screen');

	$jsFilePath = glob(get_template_directory() . '/public/pluri.*.js');
	$jsFileURI = get_template_directory_uri() . '/public/' . basename($jsFilePath[0]);
	wp_enqueue_script('pluri_js', $jsFileURI, array(), PLURI_VERSION, true);

	wp_localize_script('pluri_js', 'pluri', array(
		'ajax_url' => admin_url('admin-ajax.php'),
		'home_url' => home_url(),
		'nonce' => wp_create_nonce('pluri_nonce'),
		'tags'	=> get_tags(),
	));
}
add_action('wp_enqueue_scripts', 'pluri_styles');




/**
 * Essential theme supports
 * */
function pluri_theme_setup()
{
	/** automatic feed link*/
	add_theme_support('automatic-feed-links');

	/** tag-title **/
	add_theme_support('title-tag');

	/** post thumbnail **/
	$post_types = get_post_types();
	add_theme_support('post-thumbnails', array('cuaderno_de_notas', 'post', 'page', 'red_y_consejo', 'recursos_pedagogicos', 'formaciones', 'cursos'));

	add_image_size('pl_300x300', 300, 300, true);

	/** HTML5 support **/
	add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));

	/** refresh widgets **/
	add_theme_support('customize-selective-refresh-widgets');
}
add_action('after_setup_theme', 'pluri_theme_setup');

register_nav_menus(
	array(
		'principal' => esc_html__('Principal', 'pluri_landing'),
		'icon_links' => esc_html__('Links', 'pluri_landing')
	)
);

add_filter('get_the_archive_title', function ($title) {
	global $post;

	if (is_post_type_archive()) {
		$ptypeobj = get_post_type_object(get_post_type($post->ID));
		$title = $ptypeobj->labels->name;
	}

	return $title;
});


function tag_filter($query)
{
	if (!is_admin()) {
		if ($query->is_tag) {
			$query->set('post_type', array('post', 'calendario', 'cursos', 'cuaderno_de_notas', 'formaciones', 'red_y_consejo', 'recursos_pedagogicos'));
		}
	}
}
add_action('pre_get_posts', 'tag_filter');

function pluri_custom_mime_types($mimes)
{

	// New allowed mime types.
	$mimes['md']  = 'text/markdown';
	$mimes['markdown'] = 'text/markdown';

	return $mimes;
}

add_filter('upload_mimes', 'pluri_custom_mime_types');

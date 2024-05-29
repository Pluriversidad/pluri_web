<?php
//functions

define('PLURI_VERSION', '0.4.3');
define('PLURI_TYPES', ['cursos', 'formaciones', 'cuaderno_de_notas', 'red_y_consejo', 'calendario', 'recursos_pedagogicos', 'publicaciones']);
define('PLURI_VERSIONS', ['high', 'low']);

function pluri_styles()
{
	$cssFilePath = glob(get_template_directory() . '/public/pluri.*.css');
	$cssFileURI = get_template_directory_uri() . '/public/' . basename($cssFilePath[0]);
	wp_enqueue_style('pluri_frontend', $cssFileURI, array(), PLURI_VERSION, 'screen');

	$jsFilePath = glob(get_template_directory() . '/public/pluri.*.js');
	$jsFileURI = get_template_directory_uri() . '/public/' . basename($jsFilePath[0]);

	if (!isset($_GET['pl_ver']) || isset($_GET['pl_ver']) && $_GET['pl_ver'] == 'high') {

		wp_enqueue_script('pluri_js', $jsFileURI, array(), PLURI_VERSION, true);


		wp_localize_script('pluri_js', 'pluri', array(
			'ajax_url' => admin_url('admin-ajax.php'),
			'home_url' => home_url(),
			'nonce' => wp_create_nonce('pluri_nonce'),
			'tags'	=> get_tags(),
		));
	}
	if (isset($_GET['pl_ver']) && $_GET['pl_ver'] == 'low') {
		wp_dequeue_script('kd_graph');
		wp_dequeue_style('kd_graph');
		wp_dequeue_script('jquery');
	}
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
	add_theme_support('post-thumbnails', array('cuaderno_de_notas', 'post', 'page', 'red_y_consejo', 'recursos_pedagogicos', 'formaciones', 'cursos', 'publicaciones'));

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

function pluri_modify_calendar_order($query)
{
	if (is_admin()) {
		return $query;
	}

	if (isset($query->query_vars['post_type']) && $query->query_vars['post_type'] == 'calendario') {
		$query->set('orderby', 'meta_value');
		$query->set('meta_key', 'fecha_inicio');
	}
	return $query;
}

add_action('pre_get_posts', 'pluri_modify_calendar_order');

function pluri_custom_mime_types($mimes)
{

	// New allowed mime types.
	$mimes['md']  = 'text/markdown';
	$mimes['markdown'] = 'text/markdown';

	return $mimes;
}

add_filter('upload_mimes', 'pluri_custom_mime_types');

function pluri_get_versions()
{
	//Stores a cookie with the current site version
	return $_GET['pl_ver'];
}


function pluri_set_versions()
{
	if (isset($_GET['pl_ver'])) :
		$version = $_GET['pl_ver'];
		setcookie('pl_ver', $version, time() + 606024 * 30);
	endif;
}

add_action("init", "pluri_set_versions");


function pluri_filter_for_ver()
{
	$pl_ver = isset($_GET['pl_ver']) ? $_GET['pl_ver'] : null;

	if ($pl_ver == 'low') {
		add_filter('post_thumbnail_html', 'pluri_filter_images', 10, 5);
	}
}

add_action("init", "pluri_filter_for_ver", 10, 0);

function pluri_filter_images($html, $post_id, $post_thumbnail_id, $size, $attr)
{
	$html = '<!-- Pluriversidad Nómada en gasto energético bajo -->';

	return $html;
}


function pluri_url_builder($version)
{
	$actual_version = isset($_GET['pl_ver']) ? $_GET['pl_ver'] : null;
	//strip query strings
	$clean_url = get_bloginfo('url') . strtok($_SERVER["REQUEST_URI"], '?');
	if ($actual_version == $version) {
		return $clean_url;
	} else {
		$new_url = add_query_arg('pl_ver', $version, $clean_url);
		return esc_url($new_url);
	}
}

add_action('pre_get_posts', 'pluri_calendario_order');

function pluri_calendario_order($query)
{
	//Forces order in calendario items
	// if (is_post_type_archive('calendario')) {
	// 	$query->set('orderby', 'meta_value');
	// 	$query->set('meta_key', 'fecha_inicio');
	// 	$query->set('meta_type', 'DATETIME');
	// }
}

add_filter('post_gallery', 'pluri_galleries', 10, 2);
function pluri_galleries($output, $attr)
{
	global $post;

	if (isset($attr['orderby'])) {
		$attr['orderby'] = sanitize_sql_orderby($attr['orderby']);
		if (!$attr['orderby'])
			unset($attr['orderby']);
	}

	extract(shortcode_atts(array(
		'order' => 'ASC',
		'orderby' => 'menu_order ID',
		'id' => $post->ID,
		'itemtag' => 'dl',
		'icontag' => 'dt',
		'captiontag' => 'dd',
		'columns' => 3,
		'size' => 'large',
		'include' => '',
		'exclude' => ''
	), $attr));

	$id = intval($id);
	if ('RAND' == $order) $orderby = 'none';

	if (!empty($include)) {
		$include = preg_replace('/[^0-9,]+/', '', $include);
		$_attachments = get_posts(array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby));

		$attachments = array();
		foreach ($_attachments as $key => $val) {
			$attachments[$val->ID] = $_attachments[$key];
		}
	}

	if (empty($attachments)) return '';

	// Here's your actual output, you may customize it to your need
	$output = "<div class=\"swiper-container\">\n";
	$output .= "<div class=\"swiper-wrapper\">\n";


	// Now you loop through each attachment
	foreach ($attachments as $id => $attachment) {
		// Fetch the thumbnail (or full image, it's up to you)
		$img = wp_get_attachment_image_src($id, 'large');
		$link = wp_get_attachment_image_src($id, 'large');
		$output .= "<div class=\"swiper-slide\">\n";
		$output .= "<a href=\"{$link[0]}\">";
		$output .= "<img src=\"{$img[0]}\" width=\"{$img[1]}\" height=\"{$img[2]}\" alt=\"\" />\n";
		$output .= "</a>";
		$output .= "</div>\n";
	}


	$output .= "</div>\n";
	$output .= "<!-- Add Pagination -->\n";
	$output .= "<div class=\"swiper-pagination\"></div>\n";
	$output .= "<!-- Add Arrows -->";
	$output .= "<div class=\"swiper-button-next\"></div>\n";
	$output .= "<div class=\"swiper-button-prev\"></div>\n";
	$output .= "</div>\n";
	return $output;
}

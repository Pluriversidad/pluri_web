<?php

/** 
 * Template Name: Financiamiento
 * 
 */

$content = $args['content'];
?>

<div class="pluri_financiamiento">
    <h3><?php echo $content->post_title; ?></h3>
    <div><?php echo apply_filters('the_content', $content->post_content); ?></div>
</div>
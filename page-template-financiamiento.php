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
    <?php if (isset($_GET['pl_ver']) && $_GET['pl_ver'] == 'low') {
    ?>
        <ul class="financiamiento-low">
            <li>Fundación Daniel y Nina Carasso</li>
            <li>Allianz Foundation</li>
            <li>Generalitat de Catalunya - Departament de Cultura</li>
        </ul>
    <?php
    }; ?>
</div>
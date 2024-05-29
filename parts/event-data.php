<div class="event-data">
    <?php
	//var_dump($args['item']->ID);
	$itemid 		= $args ? $args['item']->ID : $post->ID;
	$link  	 		= get_field('enlace_principal', $itemid, true) ? get_field('enlace_principal', $itemid, true) : '';
	$lugar			= get_field('lugar', $itemid,  true);
	$pais_ciudad 	= get_field('ciudad_pais', $itemid, true);
	$inicio	 		= get_field('fecha_inicio', $itemid, true);
	$fin		 	= get_field('fecha_fin', $itemid, true);
	$hora		 	= get_field('hora', $itemid, true);
	$link_lugar		= get_field('link_lugar', $itemid, true);
	$evento 		= get_field('evento', $itemid, true);
	$link_evento	= get_field('link_evento', $itemid, true);
	?>


    <span class="date"><?php echo $inicio; ?> <?php echo $fin ? ' - ' . $fin : ''; ?></span>
    <?php
	echo $hora ? ' <span class="hora"> | ' . $hora . '</span> ' : '';
	?>
    <?php if ($link) : ?>
    | <a class="event-name"
        href="<?php echo $link; ?>"><?php echo ($args ? $args['item']->post_title : $post->post_title); ?></a>
    <?php else : ?>
    | <span class="event-name"><?php echo ($args ? $args['item']->post_title : $post->post_title); ?></span>
    <?php endif; ?>


    <?php

	if ($evento && $link_evento) {
		echo '<span class="field-data"><a class="link-evento" href="' . $link_evento . '">' . $evento . '</a></span>';
	} else if ($evento) {
		echo '<span class="field-data evento"> | ' . $evento . ' </span>';
	}

	if ($link_lugar && $lugar) :
		echo '<span class="field-data"> | <a class="link-lugar" href="' . $link_lugar . '">' . $lugar . '</a></span>';
	else :
		echo $lugar ? '<span class="field-data lugar"> | ' . $lugar . '</span>' : '';
	endif;

	if ($lugar && $pais_ciudad) {
		echo ', ';
	};
	echo $pais_ciudad ? '<span class="pais_ciudad">' . $pais_ciudad . '</span>' : '';
	?>
</div>
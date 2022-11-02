<div class="event-data">
	<?php 
	
		$link  	 		= get_field('enlace_principal', $post->ID, true);
		$lugar			= get_field('lugar', $post->ID,  true);
		$pais_ciudad 	= get_field('ciudad_pais', $post->ID, true);
		$inicio	 		= get_field('fecha_inicio', $post->ID, true);
		$fin		 	= get_field('fecha_fin', $post->ID,true);
		$hora		 	= get_field('hora', $post->ID, true);
	?>

	<span class="date"><?php echo $inicio;?> <?php echo $fin ? ' - ' . $fin : '';?></span> 
	<?php if($link):?>	
		<a class="event-name" href="<?php echo $link;?>"><?php echo $post->post_title;?></a>
	<?php else:?>
		<span class="event-name"><?php echo $post->post_title;?></span>
	<?php endif;?>
	<?php 
		echo $hora ? '<span class="hora">' . $hora . '</span>' : '';
		echo $lugar ? '<span class="lugar">' . $lugar . '</span>' : '';
		echo $pais_ciudad ? '<span class="pais_ciudad">' . $pais_ciudad . '</span>' : '';
	?>
</div>
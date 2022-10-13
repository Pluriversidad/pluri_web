<div class="event-data">
	<?php 
	$event_fields = array(
		'Link'  			=> get_field('enlace_principal', $post->ID, true),
		'Lugar'				=> get_field('lugar', $post->ID,  true),
		'País / Ciudad'		=> get_field('ciudad_pais', $post->ID, true),
		'Inicio'			=> get_field('fecha_inicio', $post->ID, true),
		'Fin'				=> get_field('fecha_fin', $post->ID,true),
		'Hora'				=> get_field('hora', $post->ID, true),
	);

	foreach($event_fields as $key=>$event_field) {
		if(strlen($event_field) > 0):
			if($key == 'Link'):
				echo '<p class="event-field"><strong>' . $key . ':</strong> <a href="' . $event_field . '">' . $event_field . '</a></p>';
			else:
				echo '<p class="event-field"><strong>' . $key . ':</strong> ' . $event_field . '</p>';
			endif;
		endif;
	}	
	?>
</div>
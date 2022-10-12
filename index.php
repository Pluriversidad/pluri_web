<?php get_header();?>
<main id="primary" class="site-main">
	<?php
		if ( have_posts() ) :

			while ( have_posts() ) :
				the_post();

				/*
				 * Include the Post-Type-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
				 */
				?>

				<header class="entry-header">
					<?php if(get_post_type() != 'page'):?>
						<p class="type">
						<?php 
							$ptypeobj = get_post_type_object( get_post_type() );
							echo $ptypeobj->labels->name;
						?>
						</p>
					<?php endif;?>
				
				<h1 class="entry-title"><?php the_title();?></h1>
				<div class="entry-info">
					<?php the_terms( $post->ID, 'instituto', '<span>', ', ', '</span>' );?>
				</div>
				</header>
				<div class="entry-content">
					<?php the_content();?>

					<?php 
					//Si es un item de agenda
					if(get_post_type() == 'calendario'):
					?>

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

					<?php endif;?>
				</div>

				<?php

			endwhile;
		endif;
			?>

			<?php 
				//Si es una descripción de instituto
				if($post->post_parent == 8):
					get_template_part('parts/institutos-nav');
				endif;
			?>






</main>
<?php get_footer();?>
<?php get_header();?>

<main id="primary" class="site-main inside">
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
				
				
				
				</header>
				
				<div class="entry-content">
					<?php the_content();?>

					<?php 
					//Si es una página de instituto vinculada
					if($post->post_parent == 8 || $post->post_name == 'institutos'):
						$instituto = get_post_meta($post->ID, 'instituto_vinculado', true);
						if($instituto) {
							//Contenidos vinculados al instituto
							$content_types = ['calendario', 'cursos', 'cuaderno_de_notas', 'formaciones', 'red_y_consejo'];

							foreach($content_types as $content_type):
								$args = array(
									'post_type' 	=> $content_type,
									'numberposts' 	=> -1,
									'tax_query'		=> array(
														array(
															'taxonomy' => 'instituto',
															'field'		=> 'term_id',
															'terms'		=> $instituto[0]
															)
														)
								);

								$items = get_posts($args);

								if($items) {
									$typelabels = get_post_type_object($content_type);

									?>

									<h3><?php echo $typelabels->labels->name;?></h3>

									<ul>
										<?php foreach($items as $item):?>
											<li><a href="<?php echo get_permalink($item->ID);?>"><?php echo $item->post_title;?></a></li>
										<?php endforeach;?>
									</ul>

									<?php
								}
							endforeach;


						}
					endif;
					?>

					<?php 
					//Si es un item de agenda
					if(get_post_type() == 'calendario'):
					?>

						<?php get_template_part('parts/event-data');?>

					<?php endif;?>
				</div>

				
					<div class="image-wrapper sidebar-right">
						<?php if(has_post_thumbnail() && get_post_type() == 'red_y_consejo'):?>
							<?php the_post_thumbnail('medium_large');?>
						<?php endif;?>			
						
						<div class="entry-info">
							<?php 
								$institutos = get_the_terms( $post->ID, 'instituto' );
								$tags = get_the_terms( $post->ID, 'post_tag');
							?>

							<?php if($institutos):?>
							<h3>Institutos</h3>
							<div class="institutos-terms">
								<?php the_terms( $post->ID, 'instituto', '<span>', '</span>' );?>
							</div>
							<?php endif;?>

							<?php if($tags):?>
							<h3>Etiquetas</h3>
							<div class="tag-terms">
								<?php the_terms( $post->ID, 'post_tag', '<span>', '</span>' );?>
							</div>
							<?php endif;?>


						</div>

					</div>
				

				<?php

			endwhile;
		endif;
			?>

			
</main>
<?php 
				//Si es una descripción de instituto
				if($post->post_parent == 8 || $post->post_name == 'institutos'):
					get_template_part('parts/institutos-nav');
				endif;
			?>

<?php get_footer();?>
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

					
				</div>

				
					<div class="image-wrapper sidebar-right">		
						
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

<?php get_footer();?>
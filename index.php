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

						<?php get_template_part('parts/event-data');?>

					<?php endif;?>
				</div>

				<?php

			endwhile;
		endif;
			?>

			<?php 
				//Si es una descripción de instituto
				if($post->post_parent == 8 || $post->post_name == 'institutos'):
					get_template_part('parts/institutos-nav');
				endif;
			?>






</main>
<?php get_footer();?>
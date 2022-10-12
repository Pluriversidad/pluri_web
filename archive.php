<?php get_header();?>
<main id="primary" class="site-main">
	<h1 class="archive-title"><?php the_archive_title( );?></h1>
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

				<h2 class="archive-entry-title">
					<a href="<?php the_permalink();?>">
						- <?php the_title();?>		
					</a>
				</h2>

				<?php

			endwhile;
		endif;
			?>
</main>
<?php get_footer();?>
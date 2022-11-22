<?php get_header();?>
<main id="primary" class="site-main">
	<h1 class="archive-title"><?php the_archive_title( );?></h1>
	<?php
	if ( have_posts() ) :?>

		<div class="archive-items-wrapper">

			<?php

			while ( have_posts() ) :?>
				<article class="archive-item <?php echo 'archive-item-' . get_post_type();?> <?php echo (has_post_thumbnail()? 'with-image' : 'no-image');?>">
						
						<?php
						the_post();

						/*
						 * Include the Post-Type-specific template for the content.
						 * If you want to override this in a child theme, then include a file
						 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
						 */
						?>
						
						
			

					<div class="archive-entry-content">
						
				
						

						<?php 
							//Si es un item de agenda
						
						if(get_post_type() == 'calendario'):
							get_template_part('parts/event-data');
						endif;

						?>

						

					</div>
					
					
	
	</article>
	<?php

endwhile;?>


</div>
<?php
else:?>

	<div class="archive-items-wrapper">
		<article class="no-content">
			<h2 class="archive-entry-title">Esta sección aún no tiene contenido</h2>
		</article>
	</div>

	<?php 
endif;
?>
</main>
<?php get_footer();?>
<?php get_header();?>
<main id="primary" class="site-main">
	<h1 class="archive-title"><?php the_archive_title( );?></h1>
	<?php
	if ( have_posts() ) :?>

		<div class="archive-items-wrapper">

			<?php

			while ( have_posts() ) :?>
				<article class="archive-item <?php echo (has_post_thumbnail()? 'with-image' : 'no-image');?>">
						
						<?php
						the_post();

						/*
						 * Include the Post-Type-specific template for the content.
						 * If you want to override this in a child theme, then include a file
						 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
						 */
						?>
						<a href="<?php the_permalink();?>">
						<?php if(has_post_thumbnail(  ) && get_post_type() != 'calendario'):?>

						<div class="archive-post-thumbnail">
							<?php the_post_thumbnail('thumbnail');?>
						</div>

						<?php endif;?>
						
			

					<div class="archive-entry-content">
						<?php if(get_post_type() != 'calendario'):?>
							
							<h2 class="archive-entry-title">
								<?php the_title();?>
							</h2>

						<?php endif;?>

				
						

						<?php 
							//Si es un item de agenda
						
						if(get_post_type() == 'calendario'):
							get_template_part('parts/event-data');
						endif;

						?>

						

					</div>
					
					</a>
	
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
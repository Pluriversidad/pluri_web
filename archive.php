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
				<?php if(has_post_thumbnail(  ) && get_post_type() != 'calendario'):?>

					<div class="archive-post-thumbnail">
						<a href="<?php the_permalink();?>"><?php the_post_thumbnail('thumbnail');?></a>
					</div>

				<?php endif;?>

				<?php if(!has_post_thumbnail() && get_post_type() == 'red_y_consejo'):?>

					<a href="<?php the_permalink();?>" class="placeholder-thumbnail">
						
					</a>

				<?php endif;?>

				<div class="archive-entry-content">
					<h2 class="archive-entry-title">
						<?php if(get_post_type() != 'red_y_consejo'):?>
							<a href="<?php the_permalink();?>"><?php the_title();?></a>
						<?php else:?>
							<?php the_title();?>
						<?php endif;?>
					</h2>

					<div class="excerpt">
						<?php the_excerpt();?>
					</div>
				

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
		endif;
			?>
</main>
<?php get_footer();?>
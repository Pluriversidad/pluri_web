<?php get_header(); ?>
<main id="primary" class="site-main">
	<!--<h1 class="archive-title"><?php the_archive_title(); ?></h1>-->

	<?php

	$redcats = [20, 21, 22];

	foreach ($redcats as $redcat) {
		$args = array(
			'post_type' 	=> 'red_y_consejo',
			'cat'	=> $redcat,
			'numberposts'	=> -1,
			'orderby'		=> 'name',
			'order'			=> 'ASC',
		);

		$integrantes = get_posts($args);

		if ($integrantes) {
			$cat = get_category($redcat);

	?>
			<div>
				<h2 class="cat-red"><?php echo $cat->cat_name; ?></h2>
				<section class="cat-red-section">


					<?php

					foreach ($integrantes as $integrante) {

					?>

						<article class="archive-item archive-item-red_y_consejo <?php echo (has_post_thumbnail($integrante->ID) ? 'with-image' : 'no-image'); ?>">
							<a href="<?php echo get_permalink($integrante->ID); ?>">
								<?php if (isset($_GET['pl_ver']) && $_GET['pl_ver'] == 'low') : ?>
									<div class="nothing-container"></div>
								<?php else : ?>
									<div class="image-container">
										<?php
										$thumbnailID = get_post_thumbnail_id($integrante->ID);
										$thumbSrc = wp_get_attachment_image_src($thumbnailID, 'pl_300x300');
										?>
										<img class="integrante-imagen" src="<?= $thumbSrc[0]; ?>" alt="<?= $integrante->post_title; ?>">
									</div>
								<?php endif; ?>

								<h3><?php echo get_the_title($integrante->ID); ?></h3>

							</a>

						</article>

				<?php }
				}; ?>
				</section>
			<?php
		}

			?>

			</div>
			<?php
			$args = array(
				'post_type' 	=> 'page',
				'meta_query'    =>  array(
					array(
						'key' 	=> '_wp_page_template',
						'value'	=> 'page-template-financiamiento.php'
					)
				)
			);
			$financiamiento = get_posts($args)[0];
			if ($financiamiento) :
				get_template_part('page-template-financiamiento', null, array('content' => $financiamiento));
			endif;
			?>
</main>
<?php get_footer(); ?>
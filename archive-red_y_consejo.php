<?php get_header(); ?>
<main id="primary" class="site-main">
	<!--<h1 class="archive-title"><?php the_archive_title(); ?></h1>-->

	<?php

	$redcats = ['nucleo', 'consejo', 'red'];

	foreach ($redcats as $redcat) {
		$args = array(
			'post_type' 	=> 'red_y_consejo',
			'category_name'	=> $redcat,
			'numberposts'	=> -1
		);

		$integrantes = get_posts($args);

		if ($integrantes) {
			$catID = get_cat_ID($redcat);
			$cat = get_category($catID);

	?>
			<div>
				<h2 class="cat-red"><?php echo $cat->name; ?></h2>
				<section class="cat-red-section">


					<?php

					foreach ($integrantes as $integrante) {

					?>

						<article class="archive-item archive-item-red_y_consejo <?php echo (has_post_thumbnail($integrante->ID) ? 'with-image' : 'no-image'); ?>">
							<a href="<?php echo get_permalink($integrante->ID); ?>">

								<div class="image-container">
									<?php
									$thumbnailID = get_post_thumbnail_id($integrante->ID);
									$thumbSrc = wp_get_attachment_image_src($thumbnailID, 'pl_300x300');
									?>
									<img class="integrante-imagen" src="<?= $thumbSrc[0]; ?>" alt="<?= $integrante->post_title; ?>">
								</div>

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
</main>
<?php get_footer(); ?>
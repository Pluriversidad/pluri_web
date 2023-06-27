<?php get_header(); ?>

<main id="primary" class="site-main inside with-institutos-nav">
	<?php

	$current_taxonomy = $wp_query->get_queried_object();
	//get linked page
	//var_dump($current_taxonomy);
	?>

	<header class="taxonomy-header">
		<h1><?php echo $current_taxonomy->name; ?></h1>
		<div class="entry-content">
			<?php echo apply_filters('the_content', $current_taxonomy->description); ?>
		</div>
	</header>

	<div class="taxonomy-items">
		<?php
		//Si es una página de instituto vinculada
		//Contenidos vinculados al instituto
		$content_types = ['cursos', 'formaciones', 'recursos_pedagogicos', 'cuaderno_de_notas', 'red_y_consejo', 'calendario'];

		foreach ($content_types as $content_type) :
			$args = array(
				'post_type' 	=> $content_type,
				'numberposts' 	=> -1,
				'tax_query'		=> array(
					array(
						'taxonomy' => $current_taxonomy->taxonomy,
						'field'		=> 'slug',
						'terms'		=> $current_taxonomy->slug
					)
				)
			);
			if ($content_type == 'red_y_consejo') {
				$args['orderby'] = 'post_title';
				$args['order']	 = 'ASC';
			}

			$items = get_posts($args);

			if ($items) { ?>

				<?php
				$typelabels = get_post_type_object($content_type);

				?>

				<article class="list-taxonomy-items archive-type-<?php echo $content_type; ?>">
					<h3><?php echo $typelabels->labels->name; ?></h3>

					<ul class="archive-items-list">
						<?php foreach ($items as $item) :
							$thumbid = get_post_thumbnail_id($item->ID);
							$thumbnail = wp_get_attachment_image_src($thumbid, 'post_thumbnail');
						?>
							<li class="taxonomy-archive-item <?php echo ($content_type == 'calendario' ? 'taxonomy-archive-item-calendario' : ''); ?>">
								<?php if ($content_type != 'calendario') :
								?>
									<a href="<?php echo get_permalink($item->ID); ?>">
									<?php endif; ?>

									<?php if ($content_type != 'calendario') {
									?>

										<?php if (has_post_thumbnail($item->ID) && isset($_GET['pl_ver']) && $_GET['pl_ver'] == 'high' || has_post_thumbnail($item->ID) && !isset($_GET['pl_ver'])) : ?>
											<img src="<?php echo $thumbnail[0]; ?>" alt="<?php echo $item->post_title; ?>">
										<?php else : ?>
											<div class="img-placeholder"></div>
										<?php endif; ?>

									<?php }; ?>




									<?php if ($content_type == 'calendario') {
										get_template_part('parts/event-data', null, array('item' => $item));
									} else { ?>
										<h3><?php echo $item->post_title; ?></h3>
									<?php } ?>
									<?php if ($content_type != 'calendario') :
									?>
									</a>
								<?php endif; ?>
							</li>
						<?php endforeach; ?>
					</ul>
				</article>

		<?php
			}
		endforeach;

		?>
	</div>




</main>

<?php
//Si es una descripción de instituto
if (is_taxonomy('instituto')) :
	get_template_part('parts/institutos-nav');
endif;
?>

<?php get_footer(); ?>
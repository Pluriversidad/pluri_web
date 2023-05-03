<?php get_header(); ?>
<main id="primary" class="site-main">
	<h1 class="archive-title"><?php the_archive_title(); ?></h1>
	<?php
	if (have_posts()) : ?>

		<div class="pluri_bytype-archive-items-wrapper">

			<?php

			while (have_posts()) : ?>


				<?php
				the_post();
				$content_types = PLURI_TYPES;
				foreach ($content_types as $content_type) :
					if ($post->post_type == $content_type) :
						$sorted_content[$content_type][] = $post;
					endif;
				endforeach;
				?>


			<?php

			endwhile; ?>

			<?php
			foreach ($content_types as $content_type) :
				if (isset($sorted_content[$content_type])) {
					$typeobj = get_post_type_object($content_type);
			?>
					<section class="pluri_archive-items pluri_archive-<?= $content_type; ?>">
						<h2><?= $typeobj->labels->name; ?></h2>
						<div>
							<?php
							foreach ($sorted_content[$content_type] as $item) :
							?>
								<article>
									<?php if (has_post_thumbnail()) : ?>
										<div class="archive-post-thumbnail">
											<a href="<?php echo get_permalink($item->ID); ?>"><?php echo get_the_post_thumbnail($item->ID, 'thumbnail'); ?></a>
										</div>
									<?php endif; ?>
									<?= get_field('cursos_vinculados', $item->ID) ? '<span>' . get_field('cursos_vinculados', $item->ID)[0]->post_title . '</span>' : ''; ?>
									<h3><a href="<?php get_permalink($item->ID); ?>"><?= $item->post_title; ?></a></h3>
								</article>
							<?php
							endforeach;
							?>
						</div>
					</section>
				<?php
				}

				?>

			<?php
			endforeach; ?>

		</div>
	<?php
	else : ?>

		<div class="archive-items-wrapper">
			<article class="no-content">
				<h2 class="archive-entry-title">Esta sección aún no tiene contenido</h2>
			</article>
		</div>

	<?php
	endif;
	?>
</main>
<?php get_footer(); ?>
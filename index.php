<?php get_header(); ?>

<main id="primary" class="site-main inside">
	<?php
	if (have_posts()) :

		while (have_posts()) :
			the_post();
	?>

			<header class="entry-header">
				<?php if (get_post_type() != 'page') : ?>
					<p class="type">
						<?php
						$ptypeobj = get_post_type_object(get_post_type());
						echo $ptypeobj->labels->name;
						?>
					</p>
				<?php endif; ?>

				<h1 class="entry-title"><?php the_title(); ?></h1>



			</header>

			<div class="entry-content">
				<?php the_content(); ?>

				<?php
				//Si es un curso
				if (get_post_type() == 'cursos') :
					get_template_part('parts/formaciones-desde-curso', null, array('cursoid' => $post->ID));
				endif; ?>

				<?php
				//Si es un item de agenda
				if (get_post_type() == 'calendario') :
				?>

					<?php get_template_part('parts/event-data'); ?>

				<?php endif; ?>
			</div>


			<div class="image-wrapper sidebar-right">
				<?php if (has_post_thumbnail() && get_post_type() == 'red_y_consejo') : ?>
					<?php the_post_thumbnail('medium_large'); ?>
				<?php endif; ?>

				<div class="entry-info">
					<?php
					$institutos = get_the_terms($post->ID, 'instituto');
					$tags = get_the_terms($post->ID, 'post_tag');
					$web = get_field('web', $post->ID);
					$web_adicional = get_field('web_adicional', $post->ID);
					$cursos = get_field('cursos_vinculados', $post->ID);
					$url_limit = 30;
					?>

					<?php if ($cursos) : ?>
						<h3>Cursos</h3>
						<div class="cursos">
							<?php foreach ($cursos as $curso) : ?>
								<p>
									<a href="<?php echo get_permalink($curso->ID); ?>"><?= $curso->post_title; ?></a>
								</p>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>

					<?php if ($web) :  ?>
						<h3>Web</h3>
						<div class="webs">
							<p>
								<a href="<?php echo $web; ?>" target="_blank"><?php echo (strlen($web) > $url_limit) ? substr($web, 0, $url_limit) . '...' : $web; ?></a>
							</p>
							<?php if ($web_adicional) : ?>
								<p>
									<a href="<?php echo $web_adicional; ?>" target="_blank"><?php echo (strlen($web_adicional) > $url_limit) ? substr($web_adicional, 0, $url_limit) . '...' : $web_adicional; ?></a>
								</p>
							<?php endif; ?>

						</div>
					<?php endif; ?>


					<?php if ($institutos) : ?>
						<h3>Institutos</h3>
						<div class="institutos-terms">
							<?php the_terms($post->ID, 'instituto', '<span>', '</span>'); ?>
						</div>
					<?php endif; ?>

					<?php if ($tags) : ?>
						<h3>Etiquetas</h3>
						<div class="tag-terms">
							<?php the_terms($post->ID, 'post_tag', '<span>', '</span>'); ?>
						</div>
					<?php endif; ?>


				</div>

			</div>


	<?php

		endwhile;
	endif;
	?>


</main>
<?php
//Si es una descripción de instituto
if (isset($post) && $post->post_parent == 8 || isset($post) && $post->post_name == 'institutos') :
	get_template_part('parts/institutos-nav');
endif;
?>

<?php get_footer(); ?>
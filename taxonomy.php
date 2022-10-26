<?php get_header();?>

<main id="primary" class="site-main">
	<?php 

	$current_taxonomy = $wp_query->get_queried_object();
		//get linked page
		//var_dump($current_taxonomy);
	?>

	<header>
		<h1><?php echo $current_taxonomy->name;?></h1>
		<div class="entry-content">
			<?php echo apply_filters('the_content', $current_taxonomy->description);?>
		</div>
	</header>

	<div class="taxonomy-items">
		<?php 
		//Si es una página de instituto vinculada
		//Contenidos vinculados al instituto
		$content_types = ['calendario', 'cursos', 'cuaderno_de_notas', 'formaciones', 'red_y_consejo'];

		foreach($content_types as $content_type):
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

			$items = get_posts($args);

			if($items) {
				$typelabels = get_post_type_object($content_type);

				?>

				<article class="archive-item taxonomy-item">
					<h3><?php echo $typelabels->labels->name;?></h3>

					<ul>
						<?php foreach($items as $item):?>
							<li><a href="<?php echo get_permalink($item->ID);?>"><?php echo $item->post_title;?></a></li>
						<?php endforeach;?>
					</ul>
				</article>

				<?php
			}
		endforeach;

	?>
</div>



		<?php 
				//Si es una descripción de instituto
		if(is_taxonomy( 'instituto' )):
			get_template_part('parts/institutos-nav');
		endif;
		?>
	</main>

	<?php get_footer();?>
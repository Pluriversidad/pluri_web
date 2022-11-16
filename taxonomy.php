<?php get_header();?>

<main id="primary" class="site-main inside with-institutos-nav">
	<?php 

	$current_taxonomy = $wp_query->get_queried_object();
		//get linked page
		//var_dump($current_taxonomy);
	?>

	<header class="taxonomy-header">
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

			if($items) {?>
				<h1>Contenidos de este instituto:</h1>
				<?php
				$typelabels = get_post_type_object($content_type);

				?>

				<article class="archive-items taxonomy-item">
					<h3><?php echo $typelabels->labels->name;?></h3>

					<ul class="archive-items-list">
						<?php foreach($items as $item):
							$thumbid = get_post_thumbnail_id($item->ID);
							$thumbnail = wp_get_attachment_image_src( $thumbid, 'thumbnail' );
							?>
							<li>
								<a href="<?php echo get_permalink($item->ID);?>">
								
								<?php if(has_post_thumbnail( $item->ID )):?>	
									<img src="<?php echo $thumbnail[0];?>" alt="<?php echo $item->post_title;?>">
								<?php else:?>
									<div class="img-placeholder"></div>
								<?php endif;?>

								<h3><?php echo $item->post_title;?></h3>
									
								</a></li>
						<?php endforeach;?>
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
		if(is_taxonomy( 'instituto' )):
			get_template_part('parts/institutos-nav');
		endif;
		?>

	<?php get_footer();?>
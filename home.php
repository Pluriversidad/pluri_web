<?php get_header(); ?>
<main id="primary" class="site-main">

    <!-- <div class="home-section">
        <div class="description">
            <?php
            //display home page content
            $about = get_page(59);
            echo apply_filters('the_content', $about->post_content);
            ?>
        </div>

        <div class="pluri-tag-cloud">

        </div>

    </div> -->

</main>


<?php get_template_part('parts/institutos-nav');
?>

<?php get_footer(); ?>
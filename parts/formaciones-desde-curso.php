<?php
//Pasar un $att con cursoid
$cursoid = $args['cursoid'];
$today = new DateTime('now');


$args = array(
    'post_type'         => 'formaciones',
    'numberposts'       => -1,
    'orderby'           => 'meta_value_num',
    'order'             => 'DESC',
    'meta_key'          => 'fecha_inicio_formacion',
    'meta_query'    => array(
        array(
            'key'        => 'cursos_vinculados',
            'value'        => '"' . $cursoid . '"',
            'compare'    => 'LIKE'
        )
    )
);
$cursos = get_posts($args);
if ($cursos) {

?>
    <div class="archive-items-wrapper pluri-cursos-wrapper">
        <?php
        foreach ($cursos as $curso) :
            $inicio = get_field('fecha_inicio_formacion', $curso->ID);
            $fin = get_field('fecha_fin_formacion', $curso->ID);
            $datetime = new DateTime();
            $end = $datetime->createFromFormat('d/m/Y', $fin);
        ?>

            <article class="archive-item with-image <?= $end < $today ? 'past-course' : 'upcoming'; ?>">
                <a href="<?php echo get_permalink($curso->ID);?>"><?= get_the_post_thumbnail($curso->ID, 'thumbnail'); ?></a>
                <div class="archive-entry-content">
                    <h2><a href="<?= get_permalink($curso->ID); ?>"><?= $curso->post_title; ?></a></h2>
                    <?php if ($inicio || $fin) : ?>
                        <div class="pluri-fechas">
                            <?php if ($inicio) : ?> <p><strong>Inicio:</strong> <?= get_field('fecha_inicio_formacion', $curso->ID); ?></p><?php endif; ?>
                            <?php if ($fin) : ?> <p><strong>Fin:</strong> <?= get_field('fecha_fin_formacion', $curso->ID); ?></p> <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </article>

    <?php endforeach;
    }
    ?>
    </div>